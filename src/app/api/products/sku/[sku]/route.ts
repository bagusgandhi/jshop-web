import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest, { params }: { params: { sku: string } }) {
  try {
    const productDetail = await axios.request({
      baseURL: `${process.env.BE_API_URL}/api/products/sku/${params.sku}`,
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