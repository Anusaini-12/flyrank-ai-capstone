type SendButtonProps = {
  onClick?: () => void;
};

export default function SendButton({ onClick }: SendButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background active:translate-y-0"
    >
      Send
    </button>
  );
}