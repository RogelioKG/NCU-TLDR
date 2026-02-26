from sqlalchemy import ForeignKey, Index, Integer, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Teacher(Base):
    __tablename__ = "teachers"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    department_id: Mapped[int | None] = mapped_column(
        Integer,
        ForeignKey("departments.id", ondelete="SET NULL"),
    )

    department: Mapped["Department | None"] = relationship(back_populates="teachers")  # type: ignore[name-defined]  # noqa: F821
    courses: Mapped[list["Course"]] = relationship(back_populates="teacher")  # type: ignore[name-defined]  # noqa: F821

    __table_args__ = (
        UniqueConstraint("name", "department_id", name="uq_teachers_name_dept"),
        Index("idx_teachers_name", "name"),
        Index("idx_teachers_department", "department_id"),
    )
