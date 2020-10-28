import StringComponent from './Types/String.component';
import PasswordComponent from './Types/Password.component';
import NumberComponent from './Types/Number.component';
import BooleanComponent from './Types/Boolean.component';
import SelectComponent from './Types/Select.component';
import CheckboxComponent from './Types/Checkbox.component';
import MultipleComponent from './Types/Multiple.component';
import FileComponent from './Types/File.component';
import GroupComponent from './Types/Group.component';
import TagsComponent from './Types/Tags.component';
import TypeaheadComponent from './Types/Typeahead.component';
import NumberTypeaheadComponent from './Types/NumberTypeahead.component';

const FIELD_MAKER_MAP = {
  string: StringComponent,
  password: PasswordComponent,
  number: NumberComponent,
  numeric: NumberComponent,
  boolean: BooleanComponent,
  select: SelectComponent,
  group: GroupComponent,
  tags: TagsComponent,
  checkbox: CheckboxComponent,
  multiple: MultipleComponent,
  file: FileComponent,
  typeahead: TypeaheadComponent,
  numbertypeahead: NumberTypeaheadComponent,
  default: StringComponent,
};

export default FIELD_MAKER_MAP;
