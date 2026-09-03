import { Container, ContainerPayload } from '@/app/types/containers/containersType';

export async function getAllContainers(): Promise<Container[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/containers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch containers');
  }

  const json = await res.json();
  return json as Container[];
}

export async function createContainer(containerData: ContainerPayload): Promise<Container> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/containers`, {
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
  return json as Container;
}

export async function getContainerByGuid(guid: string): Promise<Container> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/containers/${guid}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch container');
    }

    const json = await res.json();
    return json as Container;
}

export async function updateContainer(guid: string, containerData: Partial<ContainerPayload>): Promise<Container> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/containers/${guid}`, {
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
  return json as Container;
}

export async function deleteContainer(guid: string): Promise<void> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/containers/${guid}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to delete container');
  }
}
