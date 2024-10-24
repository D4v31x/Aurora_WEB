import { Client, Databases, Account, Teams } from 'appwrite';

const client = new Client()
    .setEndpoint(config.appwriteEndpoint)
    .setProject(config.appwriteProjectId);

const databases = new Databases(client);
const account = new Account(client);
const teams = new Teams(client);

export const appwriteService = {
    // Authentication
    async login(email, password) {
        try {
            await account.createEmailSession(email, password);
            return await this.isUserDeveloper();
        } catch (error) {
            throw new Error('Login failed');
        }
    },

    async logout() {
        try {
            await account.deleteSession('current');
        } catch (error) {
            throw new Error('Logout failed');
        }
    },

    async isUserDeveloper() {
        try {
            const membership = await teams.listMemberships();
            return membership.memberships.some(m => m.$id === config.appwriteTeamId);
        } catch {
            return false;
        }
    },

    // Blog Posts
    async createPost(title, content, category, imageUrl) {
        if (!await this.isUserDeveloper()) {
            throw new Error('Only developers can create posts');
        }

        const user = await account.get();
        
        return await databases.createDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            'unique()',
            {
                title,
                content,
                category,
                imageUrl,
                authorId: user.$id,
                authorName: user.name,
                createdAt: new Date().toISOString(),
                slug: this.createSlug(title)
            }
        );
    },

    async getPosts() {
        try {
            const response = await databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId
            );
            return response.documents;
        } catch (error) {
            throw new Error('Failed to fetch posts');
        }
    },

    async getPost(slug) {
        try {
            const response = await databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                [
                    Query.equal('slug', slug)
                ]
            );
            return response.documents[0];
        } catch (error) {
            throw new Error('Failed to fetch post');
        }
    },

    createSlug(title) {
        return title.toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    }
};