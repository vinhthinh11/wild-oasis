import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSetting';
import Spinner from '../../ui/Spinner';
import useUpdateSetting from './useUpdateSetting';

function UpdateSettingsForm() {
  const { settings } = useSettings();
  const { updateSetting, isUpdating } = useUpdateSetting();
  function handleUpdateSetting(e, updateField) {
    if (!e.target.value) return;
    updateSetting({ [updateField]: e.target.value });
  }
  if (!settings) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={settings.minBookinglength}
          disabled={isUpdating}
          onBlur={e => handleUpdateSetting(e, 'minBookinglength')}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={settings.maxBookingLength}
          disabled={isUpdating}
          onBlur={e => handleUpdateSetting(e, 'maxBookingLength')}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={settings.maxGuestPerBooking}
          disabled={isUpdating}
          onBlur={e => handleUpdateSetting(e, 'maxGuestPerBooking')}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={settings.breakfastPrice}
          disabled={isUpdating}
          onBlur={e => handleUpdateSetting(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
