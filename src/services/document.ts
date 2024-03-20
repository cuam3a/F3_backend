import { ConstantValue, User } from "../interfaces/types";
import CompetitionUserTestModel from "../models/competitionUserTest.model";
import ConstantValueModel from "../models/constantValue.model";
import DocumentModel from "../models/document.model";
import { formatConstantData, formatDocumentData } from "../utils/modelToType";

const getSingleConstant = async (id: string) : Promise<Partial<ConstantValue>> => {
  const constant = await ConstantValueModel.findOne({ _id: id });
  if(!constant) throw Error("NO FOUND CONSTANT VALUE")
  return formatConstantData(constant);
}

const getListConstant = async () : Promise<Partial<ConstantValue>[]> => {
  const constants = await DocumentModel.find<ConstantValue>(); 
  return constants.map(constant => { return formatDocumentData(constant) })
}

const addDocument = async (item: Partial<ConstantValue>) : Promise<Partial<ConstantValue>> => {
  const newConstant = await ConstantValueModel.create({
    code: item.code,
    value: item.value?.toUpperCase(),
    description: item.description,
  });

  if(!newConstant) throw Error("ERROR CREATE DOCUMENT")
  
  return formatConstantData(newConstant);
}

const updateConstant = async (id: string, item: Partial<ConstantValue>) : Promise<Partial<ConstantValue>> => {
  const updateConstant = await ConstantValueModel.findOneAndUpdate({ _id: id }, item, {
    new: true,
  });

  if(!updateConstant) throw Error("NO FOUND CONSTANT VALUE")
  
  return formatConstantData(updateConstant);
}

const removeConstant = async (id: string) : Promise<Partial<ConstantValue>> => {
  const deletedConstant = await ConstantValueModel.findOneAndDelete({ _id: id }, {
    new: true,
  });

  if(!deletedConstant) throw Error("NO FOUND CONSTANT VALUE")

  return formatConstantData(deletedConstant);
}

export {
  getSingleConstant,
  getListConstant,
  addDocument,
  updateConstant,
  removeConstant,
}