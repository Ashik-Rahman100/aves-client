import { Table, TableColumnsType, TableProps } from "antd";
import moment from "moment";
import { useState } from "react";
import { useGetAllPropertyQuery } from "../../../redux/features/admin/propertyManagement";
import { TQueryParam } from "../../../types";
import { TProperty } from "../../../types/propertyManagementType";
import { useStyle } from "../../../utils/TableStyles";

export type TTableData = Pick<
  TProperty,
  | "name"
  | "type"
  | "status"
  | "rent"
  | "size"
  | "checkIn"
  | "checkOut"
  | "contact"
>;

const Properties = () => {
  const { styles } = useStyle();

  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: propertyData, isFetching } = useGetAllPropertyQuery(params);

  console.log(params);

  const tableData = propertyData?.data?.map(
    ({ _id, name, type, rent, status, checkIn, checkOut, contact, size }) => ({
      key: _id,
      name,
      type,
      rent,
      status,
      size: `${size}`,
      checkIn: checkIn ? moment(checkIn)?.format("YYYY-MM-DD") : "Null",
      checkOut: checkOut ? moment(checkOut)?.format("YYYY-MM-DD") : "Null",
      contact,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      fixed: "left",
      // filters: [
      //   {
      //     text: "Autumn",
      //     value: "Autumn",
      //   },
      //   {
      //     text: "Fall",
      //     value: "Fall",
      //   },
      //   {
      //     text: "Summer",
      //     value: "Summer",
      //   },
      // ],
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",

      filters: [
        {
          text: "House",
          value: "House",
        },
        {
          text: "Apartment",
          value: "Apartment",
        },
        {
          text: "Commercial",
          value: "Commercial",
        },
      ],
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      filters: [
        {
          text: "Rented",
          value: "Rented",
        },
        {
          text: "Available",
          value: "Available",
        },
      ],
    },
    {
      title: "Rent",
      key: "rent",
      dataIndex: "rent",
    },
    {
      title: "Size",
      key: "size",
      dataIndex: "size",
    },
    {
      title: "CheckIn",
      key: "checkIn",
      dataIndex: "checkIn",
    },
    {
      title: "CheckOut",
      key: "checkOut",
      dataIndex: "checkOut",
    },
    {
      title: "Contact",
      key: "contact",
      dataIndex: "contact",
    },
    // {
    //   title: "Action",

    //   key: "x",
    //   render: () => {
    //     return (
    //       <div>
    //         <Button color="danger">Delete</Button>
    //       </div>
    //     );
    //   },
    // },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.type?.forEach((item) =>
        queryParams.push({ name: "type", value: item })
      );

      filters.status?.forEach((item) =>
        queryParams.push({ name: "status", value: item })
      );

      setParams(queryParams);
    }
  };

  return (
    <Table
      className={styles.customTable}
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      scroll={{ x: "max-content", y: "max-content" }}
    />
  );
};

export default Properties;
