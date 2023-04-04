import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilters, fileNamer } from './helpers';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('files')
@ApiTags('Files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService
  ) { }

  @Post('product')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilters,
    // limits: { fileSize: 4000 },
    storage: diskStorage(
      { destination: './static/products', filename: fileNamer }
    )
  }))
  uploadImageProduct(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Make sure that file is a image');
    const secureUrl = `${process.env.HOST_NAME}/files/product/${file.filename}`
    return { secureUrl };
  }

  @Get('product/:imageName')
  getProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ) {
    const path = this.filesService.getStaticImageName(imageName);
    res.sendFile(path);
  }

}
