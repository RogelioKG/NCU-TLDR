from fastapi import APIRouter, status

from app.schemas.review import Review, ReviewCreate
from app.services.mock_db import mock_db

router = APIRouter(prefix="/courses", tags=["reviews"])


@router.get(
    "/{course_id}/reviews",
    response_model=list[Review],
)
async def get_reviews(course_id: int) -> list[Review]:
    return mock_db.get_reviews(course_id=course_id)


@router.post(
    "/{course_id}/reviews",
    response_model=Review,
    status_code=status.HTTP_201_CREATED,
)
async def create_review(course_id: int, payload: ReviewCreate) -> Review:
    return mock_db.add_review(course_id=course_id, payload=payload)
