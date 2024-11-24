#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// Function to find the position to place a lamp
int findBestLampPosition(const vector<int> &objects, int range)
{
    // Sort the object positions (handles negative coordinates)
    vector<int> sortedObjects = objects;
    sort(sortedObjects.begin(), sortedObjects.end());

    int n = sortedObjects.size();
    int maxIlluminated = 0;
    int bestPosition = sortedObjects[0];

    for (int i = 0; i < n; i++)
    {
        // Set the current position of the lamp at object[i]
        int lampPosition = sortedObjects[i];

        // Use a sliding window approach to count how many objects are illuminated
        int count = 0;
        int leftLimit = lampPosition - range;
        int rightLimit = lampPosition + range;

        // Count the objects within the range [lampPosition - range, lampPosition + range]
        for (int j = 0; j < n; j++)
        {
            if (sortedObjects[j] >= leftLimit && sortedObjects[j] <= rightLimit)
            {
                count++;
            }
        }

        // Update if this position illuminates more objects
        if (count > maxIlluminated)
        {
            maxIlluminated = count;
            bestPosition = lampPosition;
        }
        // If the count is the same, choose the smaller position
        else if (count == maxIlluminated)
        {
            bestPosition = min(bestPosition, lampPosition);
        }
    }

    return bestPosition;
}

int main()
{
    // Example object positions with negative coordinates
    vector<int> objects = {-5, 3, 4, 9};
    int range = 5; // Lamp range

    // Find the best position to place the lamp
    int bestPosition = findBestLampPosition(objects, range);

    // Output the result
    cout << "Best position to place the lamp: " << bestPosition << endl;

    return 0;
}
