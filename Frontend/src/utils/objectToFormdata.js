export default function objectToFormData(obj, form = new FormData(), namespace = '') {
  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      const formKey = namespace ? `${namespace}[${property}]` : property;
      const value = obj[property];
      
      if (value instanceof Date) {
        form.append(formKey, value.toISOString());
      } else if (value instanceof File) {
        form.append(formKey, value, value.name);
      } else if (value instanceof Blob) {
        form.append(formKey, value);
      } else if (typeof value === 'object' && value !== null && !(value instanceof File)) {
        // Recursively append for nested objects/arrays
        objectToFormData(value, form, formKey);
      } else {
        form.append(formKey, value == null ? '' : value);
      }
    }
  }
  return form;
}
