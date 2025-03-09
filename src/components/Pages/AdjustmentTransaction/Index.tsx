"use client";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Modal, Popconfirm, Spin, Table, message } from "antd";
import React from "react";
import useAdjustmentTransactionStore from "@/stores/adjustment-transaction-store";
import { useSWRFetcher } from "@/hooks/useSwrFetcher";
import { useSWRMutationFetcher } from "@/hooks/useSwrFetcherMutation";
import { AdjusmentTransaction as IAdjusmentTransaction } from "@/types/adjusmentTransaction";
import Link from "next/link";
export default function AdjustmentTransactionPage() {
  const {
    limit,
    page,
    deleteById,
    updateSelectedId,
    setDeleteById,
    setUpdateSelectedId,
    setPagination,
    modalVisible,
    setModalVisible
  } = useAdjustmentTransactionStore();
  const [form] = Form.useForm();

  const resTransaction: any = useSWRFetcher({
    key: {
      url: "api/adjustment-transactions",
      params: { limit, page },
    },
  });

  const deleteTransaction = useSWRMutationFetcher({
    key: [`delete:api/adjustment-transactions/${deleteById}`],
    axiosOptions: {
      method: "DELETE",
      url: `api/adjustment-transactions/${deleteById}`,
    },
  });

  const resTransactionDetail: any = useSWRFetcher({
    key: updateSelectedId && {
      url: `api/adjustment-transactions/${updateSelectedId}`,
    },
    swrOptions: {
      onSuccess: ({ data }: { data: IAdjusmentTransaction[] }) => {
        // console.info(data?.[0])
        const result = data?.[0];
        form.setFieldsValue(result);
      },
    },
  });

  const createTransaction = useSWRMutationFetcher({
    key: [`post:api/adjustment-transactions`],
    axiosOptions: {
      method: "POST",
      url: `api/adjustment-transactions`,
    },
  });

  const updateTransaction = useSWRMutationFetcher({
    key: [`post:api/adjustment-transactions/${updateSelectedId}`],
    axiosOptions: {
      method: "PUT",
      url: `api/adjustment-transactions/${updateSelectedId}`,
    },
  });

  const columns = [
    {
      title: "No",
      key: "no",
      width: 50,
      render: (text: any, record: any, index: number) =>
        limit * (page - 1) + index + 1,
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      render: (text: any) => <Link href={`/products/sku/${text}`}>{text}</Link>,
    },
    {
      title: "QTY",
      dataIndex: "qty",
      key: "qty",
      width: 100,

    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text: any) => `${text.toLocaleString("en-US")} $`,
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      render: (text: any, record: any) => (
        <div>
          <Button
            icon={<EditOutlined />}
            size="small"
            type="link"
            onClick={() => {
              setUpdateSelectedId(record.id);
              form.setFieldsValue(record);
              setModalVisible(true);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            zIndex={10}
            title="Delete the Transaction"
            description="Are you sure to delete this Transaction Data?"
            onConfirm={async () => {
              await deleteTransaction.trigger();
              await resTransaction.mutate();
            }}
          >
            <Button
              onClick={() => setDeleteById(record?.id)}
              icon={<DeleteOutlined />}
              size="small"
              type="link"
              danger
            >
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg">Manage Your Transaction Data</p>
        <Button
          onClick={() => setModalVisible(true)}
          type="primary"
          icon={<PlusOutlined />}
        >
          Add New Transaction
        </Button>
      </div>

      <Divider />

      <Spin spinning={resTransaction?.isLoading}>
        <Table
          rowKey="id"
          dataSource={resTransaction?.data?.data ?? []}
          columns={columns}
          pagination={{
            current: page,
            pageSize: limit,
            total: resTransaction?.data?.meta?.total,
            position: ["none", "bottomCenter"],
            onChange: (page, pageSize) => {
              setPagination(page, pageSize);
            },
          }}
        />
      </Spin>

      {/* Modal */}
      <Modal
        title={updateSelectedId ? "Edit Transaction" : "Add New Transaction"}
        maskClosable={false}
        open={modalVisible}
        onOk={async () => {
          try {
            await form.validateFields();
            const values = form.getFieldsValue();
            console.log(values);
            const data: { data: Partial<IAdjusmentTransaction> } = {
              data: {
                sku: values.sku,
                qty: values.qty,
              },
            };

            if (updateSelectedId) {
              // update data
              await updateTransaction.trigger(data as any);
            } else {
              // insert new data
              await createTransaction.trigger(data as any);
            }

            await resTransaction.mutate();

            form.resetFields();
            setModalVisible(false);
          } catch (error) {
            message.error(
              "Transaction submission failed. Please check your inputs."
            );
          }
        }}
        onCancel={() => {
          setModalVisible(false);
          setUpdateSelectedId(null);
          form.resetFields();
        }}
      >
        <Spin spinning={resTransactionDetail?.isLoading}>
          <Form layout="vertical" form={form}>
            <Form.Item
              label="SKU"
              name="sku"
              rules={[
                { required: true, message: "Please input your product sku!" },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              label="QTY"
              name="qty"
              rules={[
                { required: true, message: "Please input your QTY Transaction!" },
              ]}
            >
              <Input type="number" />
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
}
