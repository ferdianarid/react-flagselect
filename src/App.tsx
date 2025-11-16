import { PhoneInput } from "./lib/country-phone-select/phone-input";

function App() {
  return (
    <div className="p-10 flex items-center justify-center min-h-screen">
      <PhoneInput onChange={(v) => console.log("Phone:", v)} />
    </div>
  );
}

export default App;
