import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule} from '@nestjs/typeorm';
import { RateLimiterModule } from 'nestjs-rate-limiter';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'marketing_user',
      password: 'marketing_user',
      database: 'marketing_app',
      synchronize: true,
      autoLoadEntities: true,
    }
  ), 
  RateLimiterModule.register({ 
    points: 5, 
    duration: 60, // limit to 5 requests per 60 seconds
  }),
  UserModule, 
  AuthModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
