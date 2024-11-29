from pydantic import BaseModel, conint

class VoteCreate(BaseModel):
    post_id: int
    dir: conint(le=1, ge=0)  # direction can only be 0 or 1
