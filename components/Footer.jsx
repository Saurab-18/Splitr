export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 py-12 text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()} Splitr. All rights reserved.
    </footer>
  );
}
