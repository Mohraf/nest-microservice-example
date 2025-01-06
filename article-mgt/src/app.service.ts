import { HttpCode, Injectable } from '@nestjs/common';
import { deleteArticleDto, saveArticleDto } from './dto/dto';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  async saveArticle(data: saveArticleDto) {
    try {
      await this.prismaService
       .$queryRaw`INSERT INTO article (title, content) VALUES (${data.title}, ${data.content})`;
       const articles = await this.getAllArticles();
       return {
        HttpCode: 201,
        message: 'Article save successfully', 
        data: articles.data,
      };
    } catch (error) {
      console.log(error);
      return {
        HttpCode: 400,
        message: 'Error saving Aricle',
        data: null
      }
    }
  }

  async getAllArticles() {
    try {
      const articles = await this.prismaService
        .$queryRaw`SELECT * from article`;
      
      return {
        HttpCode: 200,
        message: 'Articles fetched successfully',
        data: articles,
      };
    } catch (error) {
      console.log(error)
      return {
        HttpCode: 400,
        message: 'Error while fetching articles',
        data: null,
      };
    }
  }

  async deleteArticle(data: deleteArticleDto) {
    try {
      await this.prismaService
        .$queryRaw`DELETE FROM Article WHERE id = ${data.id}`;
 
      const articles = await this.getAllArticles();
 
      return {
        HttpCode: 200,
        message: 'Article deleted successfully',
        data: articles,
      };
    } catch (error) {
      console.log(error);
      return {
        HttpCode: 400,
        message: 'Error while deleting article',
        data: null,
      };
    }
  }
}
