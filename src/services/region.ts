import { ConstantValue, Region, User } from "../interfaces/types";
import RegionModel from "../models/region.model";
import { formatRegionData } from "../utils/modelToType";

const getSingleService = async (id: string) : Promise<Partial<ConstantValue>> => {
  const constant = await RegionModel.findOne({ _id: id });
  if(!constant) throw Error("NO FOUND CONSTANT VALUE")
  return formatRegionData(constant);
}

const getListService = async () : Promise<Partial<Region>[]> => {
  const list = await RegionModel.find<Region>(); 
  return list.map(constant => { return formatRegionData(constant) })
}

const addService = async (item: Partial<Region>) : Promise<Partial<Region>> => {
  const newConstant = await RegionModel.create({
    name: item.name,
    description: item.description,
  });

  if(!newConstant) throw Error("ERROR CREATE DOCUMENT")
  
  return formatRegionData(newConstant);
}

const updateService = async (id: string, item: Partial<Region>) : Promise<Partial<Region>> => {
  const updateConstant = await RegionModel.findOneAndUpdate({ _id: id }, item, {
    new: true,
  });

  if(!updateConstant) throw Error("NO FOUND CONSTANT VALUE")
  
  return formatRegionData(updateConstant);
}

export {
  getSingleService,
  getListService,
  addService,
  updateService,
}