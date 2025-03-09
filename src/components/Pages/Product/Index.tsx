"use client";
import { useSWRFetcher } from "@/hooks/useSwrFetcher";
import { useSWRMutationFetcher } from "@/hooks/useSwrFetcherMutation";
import useProductStore from "@/stores/product-stores";
import { Product as IProduct } from "@/types/product";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FundViewOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  Modal,
  Popconfirm,
  Spin,
  message,
  notification,
} from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

export default function ProductPage() {
  const {
    products,
    limit,
    nextCursor,
    hasMore,
    addProducts,
    setNextCursor,
    setHasMore,
    deleteProduct,
    deleteById,
    setDeleteById,
    updateSelected,
    setUpdateSelected,
    modalVisible,
    setModalVisible,
    addNewProducts,
    updateProduct,
    search,
    setSearch,
    clearProducts,
  } = useProductStore();
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [form] = Form.useForm();
  const [tempSearch, setTempSearch] = useState("");
  const debouncedSearch = useDebounce(tempSearch, 500);

  // console.info("updateSelected:", updateSelected); // This will only log once per update

  const resProducts: any = useSWRFetcher({
    key: {
      url: "api/products",
      params: { limit, nextCursor, search },
    },
    swrOptions: {
      onSuccess: ({ data }: { data: IProduct[] }) => {
        addProducts(data || []);
        setHasMore(data?.length === limit);
      },
    },
  });

  const delProduct = useSWRMutationFetcher({
    key: [`delete:api/products/${deleteById}`],
    axiosOptions: {
      method: "DELETE",
      url: `api/products/${deleteById}`,
    },
    swrOptions: {
      onSuccess: (data: any) => {
        // delete state
        console.info(data);
        deleteProduct(deleteById!);
        notification["success"]({
          message: "Success",
          description: "Product has been deleted",
        });
      },
    },
  });

  const resProductDetails: any = useSWRFetcher({
    key: updateSelected && {
      url: `api/products/${updateSelected?.id}`,
    },
    swrOptions: {
      onSuccess: ({ data }: { data: IProduct[] }) => {
        // console.info(data?.[0])
        const result = data?.[0];
        form.setFieldsValue(result);
      },
    },
  });

  const createProduct = useSWRMutationFetcher({
    key: [`post:api/products`],
    axiosOptions: {
      method: "POST",
      url: `api/products`,
    },
    swrOptions: {
      onSuccess: (data: any) => {
        // add data into state
        addNewProducts([data]);
        notification["success"]({
          message: "Success",
          description: "Product has been created",
        });
      },
    },
  });

  const updateProductData = useSWRMutationFetcher({
    key: [`post:api/products/${updateSelected?.id}`],
    axiosOptions: {
      method: "PUT",
      url: `api/products/${updateSelected?.id}`,
    },
    swrOptions: {
      onSuccess: (data: any) => {
        // update data into state
        updateProduct(data?.[0]);
        notification["success"]({
          message: "Success",
          description: "Product has been updated",
        });
      },
    },
  });

  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !resProducts?.isLoading) {
        setNextCursor(resProducts?.data?.nextCursor);
      }
    });

    observer.current.observe(loadMoreRef.current);

    return () => observer.current?.disconnect();
  }, [resProducts?.isLoading, hasMore, resProducts?.data?.nextCursor]);

  useEffect(() => {
    if (debouncedSearch) {
      clearProducts();
      setSearch(debouncedSearch);
      setNextCursor(undefined);
    }
  }, [debouncedSearch]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg">Manage Your Products</p>

        <Button
          onClick={() => setModalVisible(true)}
          type="primary"
          icon={<PlusOutlined />}
        >
          Add New Product
        </Button>
      </div>

      <Divider />

      <div className="py-4 flex flex-col gap-2">
        <p>Search Product</p>
        <Input
          allowClear
          type="search"
          size="large"
          placeholder="Search Product Based on the Title or SKU"
          style={{ width: "100%" }}
          onChange={(e) => {
            const search = e.target.value;
            if (search) {
              setTempSearch(search);
            } else {
              clearProducts();
              setSearch(undefined);
              setNextCursor(undefined);
            }
          }}
        />
      </div>

      <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-4 gap-2">
        {products?.map((product: IProduct, index: number) => (
          <Card
            key={index}
            hoverable
            style={{ width: "100%" }}
            cover={
              <Image
                src={product?.image}
                alt={product?.title}
                width={200}
                height={200}
              />
            }
          >
            <div className="flex justify-center bg-gray-100 rounded py-4 mb-4 z-auto">
              <Button
                href={`/products/${product?.id}`}
                icon={<EyeOutlined />}
                size="small"
                type="text"
              >
                View
              </Button>
              <Button
                onClick={() => {
                  setUpdateSelected(product);
                  setModalVisible(true);
                }}
                icon={<EditOutlined />}
                size="small"
                type="link"
              >
                Edit
              </Button>
              <Popconfirm
                zIndex={10}
                title="Delete the Product"
                description="Are you sure to delete this product?"
                onConfirm={async () => {
                  console.log("Confirm");
                  await delProduct.trigger();
                }}
              >
                <Button
                  onClick={() => setDeleteById(product?.id)}
                  icon={<DeleteOutlined />}
                  size="small"
                  type="link"
                  danger
                >
                  Delete
                </Button>
              </Popconfirm>
            </div>
            <Meta title={product?.title} />
            <Divider />
            <div className="flex flex-col lg:flex-row items-center justify-items-start lg:justify-between">
              <div className="text-xs">
                <p className="font-semibold">{product?.sku}</p>
                <p>Stock: {product?.stock}</p>
              </div>
              <div>
                <p className="font-bold text-lg text-primary">{`${product?.price} $`}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div ref={loadMoreRef} className="flex justify-center py-8">
        {resProducts?.isLoading && (
          <div className="flex justify-center items-center gap-4">
            <p className="text-primary font-semibold">Loading</p>
            <Spin spinning={true} delay={100} />
          </div>
        )}

        {!hasMore && !resProducts?.isLoading && "No more data"}
      </div>

      {/* Modal */}
      <Modal
        title={updateSelected ? "Edit Product" : "Add New Product"}
        maskClosable={false}
        open={modalVisible}
        onOk={async () => {
          try {
            await form.validateFields();
            const values = form.getFieldsValue();
            console.log(values);
            const data: { data: Partial<IProduct> } = {
              data: {
                title: values.title,
                description: values.description,
                image: values.image,
                sku: values?.sku.toUpperCase(),
                price: values.price,
              },
            };

            if (updateSelected) {
              // update data
              await updateProductData.trigger(data as any);
            } else {
              // insert new data
              await createProduct.trigger(data as any);
            }

            form.resetFields();
            setModalVisible(false);
          } catch (error) {
            message.error(
              "Product submission failed. Please check your inputs."
            );
          }
        }}
        onCancel={() => {
          setModalVisible(false);
          setUpdateSelected(null);
          form.resetFields();
        }}
      >
        <Spin spinning={resProductDetails?.isLoading}>
          <Form layout="vertical" form={form}>
            <Form.Item
              label="Title"
              name="title"
              rules={[
                { required: true, message: "Please input your product title!" },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              label="SKU"
              name="sku"
              rules={[
                { required: true, message: "Please input your product SKU!" },
              ]}
            >
              <Input style={{ textTransform: "uppercase" }} type="text" />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              label="Image Url"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Please input your product image url!",
                },
              ]}
            >
              <Input type="url" />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[
                { required: true, message: "Please input your product price!" },
              ]}
            >
              <Input type="number" min={1} />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
}
