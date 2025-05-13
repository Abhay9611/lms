// ... existing code ...

                <CardContent className="p-4">
                  <div className="mb-4">
                    <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="playhome">Play Home</SelectItem>
                        <SelectItem value="nursery">Nursery</SelectItem>
                        <SelectItem value="lkg">LKG</SelectItem>
                        <SelectItem value="ukg">UKG</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Calendar
// ... rest of the existing code ...