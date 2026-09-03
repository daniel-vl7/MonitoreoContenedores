import { fetchWithAuth } from '@/app/utils/fetchWithAuth';

interface Container {
    guid: string;
    capacity: number;
    status: 'active' | 'inactive';
    name: string;
    isFavorite: boolean;
    limit: number;
    latitude: string;
    longitude: string;
}

async function getAllContainers(): Promise<any> {
  const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BACKEND_URL}/containers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch containers');
  }

  const json = await res.json();
  return json;
}

async function createContainer(containerData: any): Promise<any> {
  const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BACKEND_URL}/containers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(containerData),
  });

  if (!res.ok) {
    throw new Error('Failed to create container');
  }

  const json = await res.json();
  return json;
}

async function getContainerByGuid(guid: string): Promise<any> {
    const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BACKEND_URL}/containers/${guid}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch container');
    }

    const json = await res.json();
    return json;
}

async function updateContainer(guid: string, containerData: any): Promise<any> {
    const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BACKEND_URL}/containers/${guid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(containerData),
    });

    if (!res.ok) {
        throw new Error('Failed to update container');
    }

    const json = await res.json();
    return json;
}

async function deleteContainer(guid: string): Promise<void> {
  const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_BACKEND_URL}/containers/${guid}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to delete container');
  }

  return;
}

export type { Container };
export { getAllContainers, createContainer, getContainerByGuid, updateContainer, deleteContainer };
