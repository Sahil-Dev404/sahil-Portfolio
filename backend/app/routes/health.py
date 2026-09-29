from typing import Dict
from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/health")
def get_health() -> Dict[str, str]:
    return {"status": "ok"}
