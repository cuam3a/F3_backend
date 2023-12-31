import { ConstantValue, User } from "../interfaces/types";
import ConstantValueModel from "../models/constantValue.model";
import { formatConstantData } from "../utils/modelToType";

const getSingleConstant = async (id: string) : Promise<Partial<ConstantValue>> => {
  const constant = await ConstantValueModel.findOne({ _id: id });
  if(!constant) throw Error("NO FOUND CONSTANT VALUE")
  return formatConstantData(constant);
}

const getListConstant = async () : Promise<Partial<ConstantValue>[]> => {
  const constants = await ConstantValueModel.find<ConstantValue>(); 
  return constants.map(constant => { return formatConstantData(constant) })
}

const addConstant = async (item: Partial<ConstantValue>) : Promise<Partial<ConstantValue>> => {
  const newConstant = await ConstantValueModel.create({
    code: item.code,
    value: item.value?.toUpperCase(),
    description: item.description,
  });

  if(!newConstant) throw Error("ERROR CREATE CONSTANT VALUE")
  
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

const getByCode = async (code: string) : Promise<string> => {
  const constant = await ConstantValueModel.findOne({ code: code });
  if(!constant) throw Error("NO FOUND CONSTANT VALUE")
  return constant.value;
}

export {
  getSingleConstant,
  getListConstant,
  addConstant,
  updateConstant,
  removeConstant,
  getByCode,
}