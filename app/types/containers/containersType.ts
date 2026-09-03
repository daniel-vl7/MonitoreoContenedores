export interface Container {
    guid: string;
    capacity: number;
    status: 'active' | 'inactive';
    name: string;
    isFavorite: boolean;
    limit: number;
    latitude: string;
    longitude: string;
}

export type ContainerPayload = Omit<Container, 'guid'>;
