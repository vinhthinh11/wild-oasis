import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import { addEditCabin } from '../../services/apiCabins';
import FormRow from '../../ui/FormRow';

function CreateCabinForm({ cabinToEdit = {}, closeForm }) {
  const { id: editId, ...editValue } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const {
    register,
    handleSubmit,
    reset,
    formState,
    isLoading: isAdding,
  } = useForm({ defaultValues: isEditSession ? cabinToEdit : undefined });
  const { errors } = formState;
  const queryClient = useQueryClient();
  const { mutate: addNewCabin } = useMutation({
    mutationFn: addEditCabin,
    onSuccess: () => {
      toast.success('Successfully add new cabin');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: err => {
      toast.error(err.message);
    },
  });
  const { mutate: updateCabin } = useMutation({
    mutationFn: ({ newCabin, id }) => addEditCabin(newCabin, id),
    onSuccess: () => {
      toast.success('Successfully update cabin');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: err => {
      toast.error(err.message);
    },
  });
  function onSubmit(data) {
    // console.log(data);
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    if (isEditSession)
      updateCabin({ newCabin: { ...data, image }, id: editId });
    else addNewCabin({ ...data, image });
    closeForm(value => !value);
  }
  // function onError(err) {
  //   console.log('Function chua trien khai', err);
  // }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow lable="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isAdding}
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow lable="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isAdding}
          {...register('maxCapacity', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow lable="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isAdding}
          {...register('regularPrice', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow lable="Discount" error={errors?.discount?.message}>
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

      <FormRow lable="Description" error={errors?.discription?.message}>
        <Textarea
          type="number"
          id="discription"
          disabled={isAdding}
          {...register('discription', { required: 'This field is required' })}
        />
      </FormRow>
      {/* khi dang edit thi this field is not required */}
      <FormRow lable="Cabin photo">
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
        <Button disabled={isAdding} variation="secondary" type="reset">
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
