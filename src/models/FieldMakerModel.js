export default class FieldMakerModel {
    constructor({
        key,
        type,
        className,
        nonTrivialValue,
        value,
        label,
        required,
        selectedValues,
        option,
        size,
        isInteger,
        file,
        fileType,
        multiple,
        hierarchy,
        config,
        inputValue,
        options,
        max,
        onInputChange,
        onChange,
        onClick,
        onFileChange }) {
        this.key = key;
        this.type = type;
        this.className = className;
        this.nonTrivialValue = nonTrivialValue;

        this.value = value;
        this.label = label;
        this.required = required;
        this.onChange = onChange;
        this.onClick = onClick;

        // numbers
        this.isInteger = isInteger;

        // group
        this.selectedValues = selectedValues;
        this.option = option;
        this.config = config;
        this.size = size;

        // file
        this.file = file;
        this.fileType = fileType;
        this.multiple = multiple;
        this.onFileChange = onFileChange;

        // hierarchy select
        this.hierarchy = hierarchy;
        this.config = config;

        // typeahead
        this.options = options;
        this.inputValue = inputValue;
        this.onInputChange = onInputChange;

        // tags
        this.max = max;
    }
}
