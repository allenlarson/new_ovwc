interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function FormInput({ label, id, ...props }: FormInputProps) {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div>
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <input
        id={inputId}
        {...props}
        className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-card-border text-foreground placeholder:text-muted/60 text-sm focus:outline-none focus:border-accent-purple transition-colors"
      />
    </div>
  );
}
