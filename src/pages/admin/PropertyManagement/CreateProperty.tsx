import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import {
  propertyStatusOptions,
  propertyTypeOptions,
} from "../../../constants/global";

import { toast } from "sonner";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import { useAddPropertyMutation } from "../../../redux/features/admin/propertyManagement";
import { TProperty } from "../../../types/propertyManagementType";

const CreateProperty = () => {
  const [addProperty] = useAddPropertyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const propertyData: TProperty = {
      name: data.name,
      type: data.type,
      status: data.status,
      rent: Number(data.rent),
      contact: data.contact,
      location: data.location,
      owner: data.owner,
      size: `${data.size} sq fit`,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
    };
    // console.log(propertyData);

    try {
      const res = (await addProperty(propertyData)) as any;
      console.log(res);
      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId });
      } else {
        toast.success("Property was created", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHInput
            type="text"
            name="name"
            label="Name"
            placeholder="Seaside Condo"
          />
          <PHSelect label="Type" name="type" options={propertyTypeOptions} />
          <PHSelect
            label="Status"
            name="status"
            options={propertyStatusOptions}
          />
          <PHInput
            type="text"
            name="location"
            label="Location"
            placeholder="321 Ocean Drive, Seaside"
          />
          <PHInput type="number" name="rent" label="Rent" placeholder="1200" />
          <PHInput
            type="text"
            name="owner"
            label="Owner"
            placeholder="SeaView Holdings"
          />
          <PHInput
            type="email"
            name="contact"
            label="Contact"
            placeholder="info.seaview@gmail.com"
          />
          <PHInput
            type="number"
            name="size"
            label="Size"
            placeholder="1500 sq fit"
          />
          <PHDatePicker name="checkIn" label="Check In" />
          <PHDatePicker name="checkOut" label="Check Out" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateProperty;
