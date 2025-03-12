import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, ConnectionStates } from 'mongoose';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  onModuleInit() {
    this.checkConnection();
  }

  checkConnection() {
    if (this.connection.readyState === ConnectionStates.connected) {
      console.log('MongoDB Atlas está conectado');
    } else {
      console.log('MongoDB no está conectado');
    }
  }
}
