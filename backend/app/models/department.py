from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Department(Base):
    __tablename__ = "departments"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    code: Mapped[str | None] = mapped_column(String(20), unique=True)

    teachers: Mapped[list["Teacher"]] = relationship(back_populates="department")  # type: ignore[name-defined]  # noqa: F821
    courses: Mapped[list["Course"]] = relationship(back_populates="department")  # type: ignore[name-defined]  # noqa: F821
