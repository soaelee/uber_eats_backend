import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';

const BUCKET_NAME = 'taeriyakki3';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly configService: ConfigService) {}
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    AWS.config.update({
      credentials: {
        accessKeyId: this.configService.get('S3_ACCEE_KEY'),
        secretAccessKey: this.configService.get('S3_SECRET_KEY'),
      },
    });
    try {
      const objectName = `${Date.now() + file.originalname}`;
      await new AWS.S3()
        .putObject({
          Body: file.buffer,
          Bucket: BUCKET_NAME,
          Key: objectName,
          ACL: 'public-read',
        })
        .promise();
      const fileUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${objectName}`;
      return fileUrl;
    } catch (e) {
      console.log(e);
      return null;
    }
    console.log(file);
  }
}

//header "Content-Type" "multipart/form-data" 필수
//body file이라는 이름이 key여야 하고, file이 있어야 함

//AKIAVBZIAJL63NGLBOFL
//1FxUXLS94Xvexi5Zny++V+4NpiePcne8vjNv3gbi
