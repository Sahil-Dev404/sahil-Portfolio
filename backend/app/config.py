from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    frontend_origin: str = "http://localhost:3000"

    @property
    def allowed_origins(self) -> list[str]:
        if not self.frontend_origin or self.frontend_origin.strip() == "*":
            return ["*"]
        return [o.strip() for o in self.frontend_origin.split(",") if o.strip()]

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
