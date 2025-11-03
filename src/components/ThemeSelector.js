import React from "react";
import { themes } from "../themes/badgeColourThemes";

export default function ThemesSelector({ selectedTheme, onThemeChange}) {
    return (
        <div>
            <label htmlFor="themes">Choose a theme:</label>
            <select
                id="theme-select"
                value={selectedTheme}
                onChange={(e) => onThemeChange(e.target.value)}
                >
                    {Object.keys(themes).map((themeName) => (
                        <option key={themeName} value={themeName}>
                          {themeName}
                        </option>
        ))}
            </select>
        </div>
    );
}