import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export enum UserRole {
    TENANT = "TENANT",
    LANDLORD = "LANDLORD",
    ADMIN = "ADMIN",
}

export enum PropertyStatus {
    AVAILABLE = "AVAILABLE",
    RENTED = "RENTED"
}

export enum ReviewStatus {
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}

export enum UserActiveStatus {
    ACTIVE = "ACTIVE",
    BANNED = "BANNED"
}

export enum PaymentStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED"
}

export enum RentalStatus {
    ACTIVE = "ACTIVE",
    CANCELED = "CANCELED",
    EXPIRED = "EXPIRED"
}

export enum RequestStatus {
    APPROVED = "APPROVED",
    REJECTED = "REJECTED"
}

type IRentalRequest = {
    id: string,
    status: RequestStatus,
    createdAt: string,
    updatedAt: string,
    tenantId: string,
    landlordId: string,
    propertyId: string,
    property: IProperty
}

type IPayment = {
    id: string,
    currentPeriodEnd: string,
    createdAt: string,
    updatedAt: string,
    paymentStatus: PaymentStatus,
    rentalStatus: RentalStatus,
    stripeCustomerId: string,
    stripeSubscriptionId: string,
    rentalRequestId: string,
    userId: string,
    rentalRequest: IRentalRequest
}

type IUser = {
    id: string,
    name: string,
    email: string,
    activeStatus: UserActiveStatus,
    role: UserRole,
    createdAt: string,
    updatedAt: string,
    properties?: IProperty[],
    payments?: IPayment[],
    reviews?: IReview[],
    tenantRequests?: IRentalRequest[],
    landlordRequests?: IRentalRequest[]
}

type IReview = {
    id: string,
    rating: number,
    comment?: string,
    status: ReviewStatus,
    createdAt: string,
    updatedAt: string,
    reviewerId: string,
    propertyId: string,
    reviewer: IUser
}

type ICategory = {
    id: string,
    propertyType: string,
    createdAt: string,
    updatedAt: string
}

type IProperty = {
    id: string,
    houseNo: number,
    roadNo: number,
    location: string,
    price: number,
    status: PropertyStatus,
    createdAt: string,
    updatedAt: string,
    stripeProductId: string,
    stripePriceId: string,
    landlordId: string,
    categoryId: string,
    landlord: IUser,
    reviews: IReview[],
    type: ICategory
}

type IPropertyResponse = {
    success: boolean,
    statusCode: number,
    message: string,
    data: IProperty[],
    meta?: {
        page?: number,
        limit?: number,
        totalAvailablePropertyCount: number,
        totalRentedPropertyCount?: number,
        totalPropertyCount?: number,
        totalPageCount?: number
    }
}

export type PropertyProps = {
    poperty: IPropertyResponse
}

type IUserResponse = {
    success: boolean,
    statusCode: number,
    message: string,
    data: IUser
}

export type NavbarProps = {
    user: IUserResponse
}

export type ISidebarItem = {
    label: string,
    href: string,
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}