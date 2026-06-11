/* START: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */
export interface FieldSchemaType {
  fieldName?: string;
  type:
    | "string"
    | "number"
    | "boolean"
    | "object"
    | "array"
    | "color"
    | "url"
    | "enum"
    | "datetime"
    | "file"
    | "files";
  required?: boolean;
  label?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  options?: string[];
  fields?: FieldSchemaType[];
  item?: FieldSchemaType;
}
/* END: THIS SECTION CODE IS CANNOT BE CHANGED, YOU ONLY READ IT */

export type ConfigurableSchemas = {
  formSchema: FieldSchemaType[];
};



export const configurableSchemas: ConfigurableSchemas = {
  formSchema: [
    {
      fieldName: "appName",
      type: "string",
      required: true,
      label: "App Name",
    },
    {
      fieldName: "appTagline",
      type: "string",
      required: false,
      label: "App Tagline",
    },
    {
      fieldName: "logoUrl",
      type: "url",
      required: true,
      label: "Logo URL",
    },
    {
      fieldName: "brandColor",
      type: "object",
      required: true,
      label: "Brand Color",
      fields: [
        {
          fieldName: "primary",
          type: "color",
          required: true,
          label: "Primary",
        },
        {
          fieldName: "secondary",
          type: "color",
          required: true,
          label: "Secondary",
        },
        {
          fieldName: "accent",
          type: "color",
          required: true,
          label: "Accent",
        },
      ],
    },
    {
      fieldName: "ecosystemName",
      type: "string",
      required: false,
      label: "Ecosystem Name",
    },
    {
      fieldName: "ownerName",
      type: "string",
      required: false,
      label: "Owner / Founder Name",
    },
    {
      fieldName: "defaultTheme",
      type: "enum",
      required: false,
      label: "Default Theme",
      options: ["dark", "light", "system"],
    },
    {
      fieldName: "enableAIAssistant",
      type: "boolean",
      required: false,
      label: "Enable AI Assistant",
    },
    {
      fieldName: "aiAssistantName",
      type: "string",
      required: false,
      label: "AI Assistant Name",
    },
    {
      fieldName: "sidebarCollapsedByDefault",
      type: "boolean",
      required: false,
      label: "Sidebar Collapsed by Default",
    },
    {
      fieldName: "navModules",
      type: "array",
      required: false,
      label: "Navigation Modules",
      item: {
        type: "object",
        fields: [
          { fieldName: "id", type: "string", required: true, label: "ID" },
          { fieldName: "label", type: "string", required: true, label: "Label" },
          { fieldName: "enabled", type: "boolean", required: false, label: "Enabled" },
        ],
      },
    },
    {
      fieldName: "dashboardWelcomeMessage",
      type: "string",
      required: false,
      label: "Dashboard Welcome Message",
    },
    {
      fieldName: "globalSearchPlaceholder",
      type: "string",
      required: false,
      label: "Global Search Placeholder",
    },
  ],
};
