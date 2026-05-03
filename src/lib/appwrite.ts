import { Client, Databases, ID } from 'appwrite';

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

export const databases = new Databases(client);

export const createOrder = async (orderData: OrderDocument) => {
    try {
        const response = await databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
            ID.unique(),
            {
               ...orderData
            }
        );
        return response;
    } catch (error) {
        console.error("Appwrite error:", error);
        throw error;
    }
}

export interface OrderDocument {
    status?: string | null;
    configuration?: string | null;
    paymentReference?: string | null;
    engravingText?: string | null;
    engravingFont?: string | null;
    uploadedArtworkUrl?: string | null;
    addressLine1?: string | null;
    stateProvince?: string | null;
    postalCode?: string | null;
    country?: string | null;
    userId?: string | null;
    totalAmount?: number | null;
    depositAmount?: string | null;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    whatsappNumber?: string | null;
    city?: string | null;
    deliveryAddress?: string | null;
}
