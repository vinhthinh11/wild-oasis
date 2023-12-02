import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import FormRow from '../../ui/FormRow';
import useCreateCabin from './useCreateCabin';
import useUpdateCabin from './useUpdateCabin';

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const {
    register,
    handleSubmit,
    reset,
    formState,
    isLoading: isAdding,
  } = useForm({ defaultValues: isEditSession ? cabinToEdit : undefined });
  const { errors } = formState;
  const { addNewCabin } = useCreateCabin();
  const { updateCabin } = useUpdateCabin();

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    if (isEditSession)
      updateCabin(
        { newCabin: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else {
      addNewCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isAdding}
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isAdding}
          {...register('maxCapacity', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isAdding}
          {...register('regularPrice', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isAdding}
          defaultValue={0}
          {...register('discount', {
            validate: value =>
              (value >= 0 && value < 100) ||
              'The value have to be between 0 and 100',
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.discription?.message}>
        <Textarea
          type="number"
          id="discription"
          disabled={isAdding}
          {...register('discription', { required: 'This field is required' })}
        />
      </FormRow>
      {/* khi dang edit thi this field is not required */}
      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          onClick={() => onCloseModal?.()}
          disabled={isAdding}
          $variation="secondary"
          type="reset"
        >
          Cancel
        </Button>
        <Button disabled={isAdding}>
          {isEditSession ? 'Edit cabin' : 'Add cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
