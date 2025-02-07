import { Injectable } from "@nestjs/common";

@Injectable()
export class CodeService {
  constructor() // private codeModel: Model<CodeDocument>, // @InjectModel(Code.name)
  {}

  // async create(
  //   createCodeDto: CreateCodeDto,
  // ): Promise<Code> {
  //   const createdCode = new this.codeModel(createCodeDto);
  //   return createdCode.save();
  // }
  //
  // async findAll(): Promise<Code[]> {
  //   return this.codeModel.find().exec();
  // }
  //
  // async findOne(id: string): Promise<Code> {
  //   return this.codeModel.findById(id).exec();
  // }
  //
  // async update(
  //   id: string,
  //   updateCodeDto: UpdateCodeDto,
  // ): Promise<Code> {
  //   return this.codeModel
  //     .findByIdAndUpdate(id, updateCodeDto, { new: true })
  //     .exec();
  // }
  //
  // async remove(id: string): Promise<Code> {
  //   return this.codeModel.findByIdAndDelete(id).exec();
  // }
}
