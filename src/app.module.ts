import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';

@Module({
  imports: [CategoryModule,MongooseModule.forRoot('mongodb://localhost/crud_swagger_multer'), ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
