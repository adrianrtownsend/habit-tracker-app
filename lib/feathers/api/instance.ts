// instance.ts

import feathersClient from '..';

const instanceService = feathersClient.service('instance');

export const getInstance = async (id: string) => await instanceService.get(id);

export const getInstances = async () => await instanceService.find();

export const updateInstance = async (id: string, data: any) =>
	await instanceService.patch(id, data);

export const deleteInstance = async (id: string) =>
	await instanceService.remove(id);
