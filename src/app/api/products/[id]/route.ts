import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productDetail = await axios.request({
      baseURL: `${process.env.BE_API_URL}/api/products/${params.id}`,
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    return NextResponse.json(productDetail.data);

  }
    catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {

    const productData = await axios.request({
      baseURL: `${process.env.BE_API_URL}/api/products/${params.id}`,
      method: "DELETE",
      headers: {
        Accept: "application/json",
      }
    });

    return NextResponse.json(productData.data);
    
  } catch (error) {
    console.error("Error Deleting product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();

    const newProduct = await axios.request({
      baseURL: `${process.env.BE_API_URL}/api/products/${params.id}`,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data
    });
    
    return NextResponse.json(newProduct.data)
  } catch (error: any) {
    console.error("Error create new product:", error?.response?.data);
    return NextResponse.json(error?.response?.data, { status: error?.response?.data?.statusCode ?? 500 });
  }
}