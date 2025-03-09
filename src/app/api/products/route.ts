import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const nextCursor = searchParams.get("nextCursor") || undefined;
      const limit = parseInt(searchParams.get("limit") || "8");
      const search = searchParams.get("search") || undefined;

      const productData = await axios.request({
        baseURL: `${process.env.BE_API_URL}/api/products`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        params: {
          limit,
          cursor: nextCursor,
          search
        },
      });

      return NextResponse.json(productData.data);
  
    }
      catch (error) {
      console.error("Error fetching product:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const newProduct = await axios.request({
      baseURL: `${process.env.BE_API_URL}/api/products`,
      method: "POST",
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