import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request: Express.Request = context.switchToHttp().getRequest();
    // "还记得前面有提过的Passport 吗？当验证程序通过之后，会将部分资料放入请求物件中，
    // 让后续的操作可以使用该资料，我们称它为 载体(Payload)，通常会将部分使用者资讯放入载体中"
    // todo: 这里有疑惑，为什么在request上能够直接获取到user, 是因为passport的作用吗？
    return request.user;
  },
);
