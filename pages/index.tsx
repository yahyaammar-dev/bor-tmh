import React, { useState } from "react";
import { IntlProvider, FormattedMessage } from "react-intl";
import en from "../intl/en.json";
import it from "../intl/it.json";

export default function App() {
  const [locale, setLocale] = useState("en");

  const messages = { en, it };

  const handleChange = (event:any) => {
    setLocale(event.target.value);
  };

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <select onChange={handleChange}>
        <option value="en">en</option>
        <option value="fr">fr</option>
      </select>
      <div className="App">
        <FormattedMessage id="welcome" />
      </div>
    </IntlProvider>
  );
}