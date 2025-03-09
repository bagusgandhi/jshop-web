import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

export async function GET(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const page = searchParams.get("page") || 1;
      const limit = parseInt(searchParams.get("limit") || "10");

      const result = await axios.request({
        baseURL: `${process.env.BE_API_URL}/api/adjustment-transactions`,
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        params: {
          limit,
          page,
        },
      });

      return NextResponse.json(result.data);
  
    }
      catch (error: any) {
        console.error("Error create new product:", error?.response?.data);
        return NextResponse.json(error?.response?.data, { status: error?.response?.data?.statusCode ?? 500 });
    }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const result = await axios.request({
      baseURL: `${process.env.BE_API_URL}/api/adjustment-transactions`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data
    });
    
    return NextResponse.json(result.data)
  } catch (error: any) {
    console.error("Error create new product:", error?.response?.data);
    return NextResponse.json(error?.response?.data, { status: error?.response?.data?.statusCode ?? 500 });
  }
}