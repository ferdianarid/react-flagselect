
import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { countries } from "@/lib/country-phone-select/country";

interface PhoneInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function PhoneInput({ onChange }: PhoneInputProps) {
  const [countryDial, setCountryDial] = useState("+62");
  const [search, setSearch] = useState("");
  const [number, setNumber] = useState("");

  const filteredCountries = useMemo(() => {
    return countries.filter((c) =>
      c.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const updateValue = (dial: string, num: string) => {
    onChange?.(`${dial}${num}`);
  };

  return (
    <div className="flex w-full gap-2 items-center">
      {/* COUNTRY SELECT */}
      <Select
        defaultValue={countryDial}
        onValueChange={(val) => {
          setCountryDial(val);
          updateValue(val, number);
        }}
      >
        <SelectTrigger className="w-fit">
          <SelectValue placeholder="Country" />
        </SelectTrigger>

        <SelectContent className="p-0">
          {/* Search input */}
          <div className="p-2">
            <Input
              placeholder="Search country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8"
            />
          </div>

          <SelectGroup>
            {filteredCountries.map((c) => {
              const flagUrl = `https://flagicons.lipis.dev/flags/4x3/${c.code.toLowerCase()}.svg`;

              return (
                <SelectItem
                  key={c.code}
                  value={c.dial}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <img
                    src={flagUrl}
                    alt={c.label}
                    className="w-5 h-4 rounded-sm object-cover"
                  />
                  {c.label} ({c.dial})
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* PHONE INPUT */}
      <Input
        type="tel"
        value={number}
        onChange={(e) => {
          const onlyNumbers = e.target.value.replace(/\D/g, "");
          setNumber(onlyNumbers);
          updateValue(countryDial, onlyNumbers);
        }}
        placeholder="Phone number"
        className="flex-1"
      />
    </div>
  );
}
