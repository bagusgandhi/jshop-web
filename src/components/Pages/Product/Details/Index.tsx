import { Product as IProduct } from "@/types/product";
import React from "react";

export default function DetailProductPage({ data }: { data: IProduct[] }) {
  return (
    <div className="grid grid-cols-3 align-middle justify-center">
      <div className="col-span-1">
        <div className="flex flex-col">
          <div className="flex items-center justify-center">
            <img src={data[0]?.image} alt="" />
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">{data[0]?.title}</h1>
          <p>SKU: {data[0]?.sku}</p>
          <p>{data[0]?.description}</p>
          <div className="flex gap-2 items-center">
            <p className="text-primary text-lg font-semibold">{data[0]?.price} $</p> |
            <p>Stock: {data[0]?.stock}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
