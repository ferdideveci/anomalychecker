// pages/page.js

"use client";

import { useEffect, useState } from 'react';

const Home = () => {
  const [searchedNumber, setSearchedNumber] = useState('');
  const [searchedHashtagItem, setSearchedHashtagItem] = useState('');
  const [tokenID, setTokenID] = useState('');
  const [tokenCategory, setTokenCategory] = useState('');

  const fetchAllTokens = async () => {
    let allTokens = [];
    let continuationToken = '';

    do {
      const tokenBatch = await fetchTokens(continuationToken);
      if (tokenBatch && tokenBatch.tokens) {
        allTokens = allTokens.concat(tokenBatch.tokens);
        continuationToken = tokenBatch.continuation || '';
      } else {
        break;
      }
    } while (continuationToken);

    return allTokens;
  };

  const fetchTokens = async (continuationToken) => {
    const options = {
      method: 'GET',
      headers: {
        accept: '*/*',
        'x-api-key': 'b222ec2a-a8a2-5128-8731-250249ac141b'
      },
    };

    let url = 'https://api.reservoir.tools/tokens/v6?collection=0x7a31c6726f358fad0783110a46ef489372fbfc65&sortBy=updatedAt&limit=1000';
    if (continuationToken) {
      url += `&continuation=${encodeURIComponent(continuationToken)}`;
    }

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  };

  const categorizeToken = (number) => {
    const COLORS = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      12, 13, 14, 16, 18, 19, 20, 23,
      24, 49, 71, 107, 132, 170, 173,
      178, 180, 187, 189, 193, 204, 206,
      219, 221, 223, 236, 244, 255, 263,
      270, 275, 286, 288, 291, 293, 299,
      301, 307, 320, 321, 333, 341, 347,
      357, 358, 359, 360, 361, 362, 363,
      364, 365, 366, 367, 368, 369, 371,
      373, 374, 375, 376, 377, 378, 380,
      381, 382, 383, 384, 385, 386, 387,
      389, 390, 391, 393, 394, 396, 398,
      399, 403, 404, 442, 477, 483, 538,
      602, 615, 649, 701, 702, 704, 705,
      706, 707, 708, 709, 710, 711, 712,
      713, 714, 715, 717, 718, 719, 720,
      721, 722, 723, 724, 725, 727, 728,
      729, 730, 731, 732, 733, 734, 736,
      737, 738, 739, 740, 741, 742, 744,
      746, 747, 748, 753, 754, 755, 756,
      757, 758, 759, 760, 761, 762, 763,
      764, 765, 766, 768, 769, 770, 771,
      772, 774, 775, 777, 778, 779, 780,
      781, 782, 784, 786, 787, 788, 791,
      792, 793, 794, 795,
    ];
    const UNIQUE = [
      11, 17, 21, 22, 25, 28, 35, 50, 78, 90, 95,
      102, 117, 123, 128, 139, 145, 151, 152,
      166, 185, 205, 208, 229, 234, 248, 253,
      261, 266, 274, 278, 284, 294, 295, 304,
      311, 312, 316, 318, 326, 329, 330, 340,
      344, 345, 346, 370, 372, 379, 388, 392,
      395, 400, 401, 402, 405, 406, 409, 420,
      431, 440, 445, 452, 463, 468, 473, 474,
      475, 481, 488, 489, 490, 495, 497, 500,
      506, 509, 514, 520, 531, 533, 535, 545,
      549, 552, 563, 566, 568, 570, 575, 587,
      588, 607, 608, 614, 616, 617, 625, 626,
      634, 635, 642, 651, 655, 664, 667, 668,
      669, 672, 673, 676, 685, 687, 695, 716,
      726, 735, 743, 745, 749, 767, 773, 776,
      783, 785, 789, 800, 801, 816, 821, 827,
      844, 849, 855, 857, 858, 861, 862, 863,
      864, 865, 866, 867, 869, 872, 879, 883,
    ];
    const FLOWERS = [32, 43, 51, 57, 85, 343, 354, 833, 888];
    const EYES = [
      161, 176, 182, 196, 202, 209, 234, 241, 247,
      256, 447, 554, 567, 584, 592, 627, 631, 637,
      678, 818,
    ];
    const COSMIC = [
      105, 246, 353, 421, 439, 441, 518, 556, 562,
      650, 656, 658, 662, 677, 684, 696, 797, 825,
      829, 830, 832, 881, 884,
    ];
    const GRAIL = [352, 418, 419, 532];

    if (COLORS.includes(number)) {
      return 'COLORS';
    } else if (UNIQUE.includes(number)) {
      return 'UNIQUE';
    } else if (FLOWERS.includes(number)) {
      return 'FLOWERS';
    } else if (EYES.includes(number)) {
      return 'EYES';
    } else if (COSMIC.includes(number)) {
      return 'COSMIC';
    } else if (GRAIL.includes(number)) {
      return 'GRAIL';
    } else {
      return 'COMMON';
    }
  };

  const handleTokenSearch = async () => {
    if (!searchedNumber || !searchedHashtagItem || searchedNumber < 1 || searchedNumber > 888 || !/^#\d{1,3}\/10$/.test(searchedHashtagItem)) {
      alert('Please enter a valid number between 1 and 888 along with a valid hashtag item (#1/10-#10/10)');
      return;
    }

    try {
      const allTokens = await fetchAllTokens();
      const foundToken = allTokens.find(
        (token) => {
          const tokenName = token.token.name;
          const tokenPattern = `Anomaly AI ${searchedNumber} ${searchedHashtagItem}`;
          return tokenName === tokenPattern;
        }
      );

      if (foundToken) {
        setTokenID(foundToken.token.tokenId);
        const number = parseInt(searchedNumber, 10);
        const category = categorizeToken(number);
        setTokenCategory(category);
      } else {
        setTokenID('Token not found');
        setTokenCategory('');
      }
    } catch (error) {
      console.error('Error searching for token:', error);
    }
  };

  const debouncedSearch = debounce(handleTokenSearch, 300); // Adjust the delay time as needed (in milliseconds)

  // Function to debounce the token search
  function debounce(func, wait) {
    let timeout;

    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  return (
    <div>
      <h1>Anomaly AI NFT Collection Tokens</h1>
      <input
        type="number"
        value={searchedNumber}
        onChange={(e) => setSearchedNumber(e.target.value)}
        placeholder="Enter Number"
      />
      <input
        type="text"
        value={searchedHashtagItem}
        onChange={(e) => setSearchedHashtagItem(e.target.value)}
        placeholder="Enter Hashtag Item (#1/10-#10/10)"
      />
      <button onClick={debouncedSearch}>Search</button>
      {tokenID && (
        <div>
          <p>Token ID: {tokenID}</p>
        </div>
      )}
      {tokenCategory && (
        <div>
          <p>Token Category: {tokenCategory}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
