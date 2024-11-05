import io from 'socket.io-client';
import { feathers } from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import authentication from '@feathersjs/authentication-client';
import { config } from '@/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const socket = io(config.backend.dev_url, {
	transports: ['websocket'],
	forceNew: true,
});
const feathersClient = feathers();

feathersClient.configure(socketio(socket));
feathersClient.configure(
	authentication({
		storage: AsyncStorage,
	})
);

export default feathersClient;
