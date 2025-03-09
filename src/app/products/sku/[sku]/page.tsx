import DetailProductPage from "@/components/Pages/Product/Details/Index";
import axios from "axios";
export default async function page({ params }: { params: { sku: string } }) {
  const { data } = await axios.request({
    baseURL: `${process.env.BE_API_URL}/api/products/sku/${params.sku}`,
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })

  console.log(data?.data);
  
  return (
    <>
        <DetailProductPage data={data?.data ?? []} />
    </>
  );
}
