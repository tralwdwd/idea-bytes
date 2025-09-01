import { Client, Databases, Account, TablesDB, ID, Permission, Role, Query } from "appwrite";

const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT as string)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID as string);


class WhatToCode {
    
    database = new TablesDB(client);
    account = new Account(client);
    async getIdeas() {
        return this.database.listRows({
            databaseId: "what-to-code",
            tableId: "ideas"
        })
    }

    async isLoggedIn() {
        try {
            await this.account.get()
            return true;
        }
        catch(e) {
            return false;
        }
    }

    async logout() {
        
        await this.account.deleteSession({sessionId: 'current'});
        
    }

    async login(email: string, password: string) {
        try{
            await this.account.createEmailPasswordSession({email, password});
            return {success: true};
        } catch (e) {
            console.log(e);
            return {success: false, message: (e as Error).message};
        }
    }

    async signup(name: string, email: string, password: string) {
        try{
            await this.account.create({
                userId: ID.unique(),
                email,
                password,
                name
            });
            await this.account.createEmailPasswordSession({email, password});
            return {success: true};
        } catch (e) {
            return {success: false, message: (e as Error).message};
        }
    }

    async createIdea(title: string, description: string) {
        try{
            await this.database.createRow({
                databaseId: "what-to-code",
                tableId: "ideas",
                rowId: ID.unique(),
                data: {title, description},
            })
            return {success: true};
        } catch (e) {
            return {success: false, message: (e as Error).message};
        }
    }
    
    async getRandomIdea() {
        const numCheck= await this.database.listRows({
            databaseId: "what-to-code",
            tableId: "ideas",
            queries: [Query.limit(1)]
        });

        const random= await this.database.listRows({
            databaseId: "what-to-code",
            tableId: "ideas",
            queries: [
            Query.limit(1),
            Query.offset(Math.floor(Math.random() * numCheck.total)),
            ]
        })
        return random.rows[0];
    }
}

export const whatToCode = new WhatToCode();